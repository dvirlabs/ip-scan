from ping3 import ping
from concurrent.futures import ThreadPoolExecutor
import socket
import requests


def is_ip_up(ip: str):
    """
    Check if a given IP is reachable. If the response contains 'Request timed out', 
    or any other issue arises, the IP is considered 'down' (unavailable).
    """
    try:
        # Perform a request to the IP
        response = requests.get(f'http://{ip}', timeout=5)
        
        # If the request is successful, consider the IP "up" (in use)
        return {"ip": ip, "status": "up"}  # IP is in use if it responds
        
    except requests.exceptions.Timeout:
        # If a timeout exception occurs, consider the IP "down" (available)
        return {"ip": ip, "status": "down"}  # IP is available if timed out
    except requests.exceptions.RequestException:
        # Handle other request exceptions (e.g., connection errors), IP is "down" (available)
        return {"ip": ip, "status": "down"}



def scan_range(start_ip: str, end_ip: str):
    """
    Scan a range of IPs to check their status (up or down).
    """
    start_octets = start_ip.split('.')
    end_octets = end_ip.split('.')
    results = []

    with ThreadPoolExecutor(max_workers=50) as executor:
        futures = []
        for i in range(int(start_octets[3]), int(end_octets[3]) + 1):
            ip = f"{start_octets[0]}.{start_octets[1]}.{start_octets[2]}.{i}"
            futures.append(executor.submit(is_ip_up, ip))
        for future in futures:
            results.append(future.result())
    
    return results
