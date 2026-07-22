# Smart-Store Client Deployment

This repository is the React/Vite client for Smart-Store. The Express/EJS/Mongo backend is deployed separately and must expose the API URL configured in `VITE_API_BASE_URL`.

## Required Environment

Create `.env.production` before building:

```env
VITE_API_BASE_URL=https://api.example.com
```

Use the public HTTPS URL of the backend. Do not use `localhost` in production builds.

## Build

```bash
npm install
npm run build
```

The production files are generated in `dist/`.

## DigitalOcean Ubuntu Setup

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## Deploy Client Files

```bash
sudo mkdir -p /var/www/smart-store/client
sudo chown -R $USER:$USER /var/www/smart-store
git clone <repo-url> /var/www/smart-store/client
cd /var/www/smart-store/client
cp .env.production.example .env.production
nano .env.production
npm install
npm run build
```

## Nginx

Copy `deploy/nginx/smart-store-client.conf.example` to Nginx and edit `server_name` and `root` if needed:

```bash
sudo cp deploy/nginx/smart-store-client.conf.example /etc/nginx/sites-available/smart-store-client
sudo ln -s /etc/nginx/sites-available/smart-store-client /etc/nginx/sites-enabled/smart-store-client
sudo nginx -t
sudo systemctl reload nginx
```

The `try_files $uri $uri/ /index.html;` rule is required so direct visits to routes like `/products`, `/login`, and `/mypage` work.

## SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

## Updates

```bash
cd /var/www/smart-store/client
git pull
npm install
npm run build
sudo systemctl reload nginx
```

## Backend Requirements

The backend must:

- Serve uploads from public URLs such as `https://api.example.com/uploads/image.jpg`.
- Allow this frontend domain in CORS.
- Support credentials/cookies if `withCredentials` remains enabled.
- Keep JWT/session secrets only in backend environment files.

The full Express/EJS/Mongo production checklist requires the backend repository.
