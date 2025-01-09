from ping3 import ping
from concurrent.futures import ThreadPoolExecutor

def is_ip_up(ip: str):
    """
    Check if a given IP is reachable using ICMP ping.
    """
    try:
        response = ping(ip, timeout=1)  # Send a ping with a 1-second timeout
        if response is not None:  # If the IP responds to ping
            return {"ip": ip, "status": "up"}
        else:
            return {"ip": ip, "status": "down"}
    except Exception as e:
        # Handle any errors (e.g., permission issues)
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
