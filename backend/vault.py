import hvac

# Replace with your Vault address and token
vault_address = 'http://127.0.0.1:8200'  # Change to your Vault server address
vault_token = 'your-vault-token'  # Replace with your actual Vault token

# Initialize the Vault client
client = hvac.Client(url=vault_address, token=vault_token)

# Check if the client is authenticated
if not client.is_authenticated():
    print("Authentication failed")
    exit(1)

# Define the secret path (this is an example path; change according to your Vault setup)
secret_path = 'secret/data/myapp/config'

# Fetch the secret
try:
    secret_response = client.secrets.kv.v2.read_secret_version(path=secret_path)
    secret_data = secret_response['data']['data']
    password = secret_data.get('password')  # Assuming the secret has a 'password' field
    
    if password:
        print(f"Password retrieved: {password}")
    else:
        print("Password not found in the secret.")
except Exception as e:
    print(f"Error fetching secret: {e}")
