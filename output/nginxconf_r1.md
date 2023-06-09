user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}

http {

    upstream FrontServers {
		server 172.17.0.1:3000;
		server 172.17.0.1:4000;
		keepalive 32;
	}

    server {
		listen 80;
		listen [::]:80;
		server_name j8a802.p.ssafy.io;
		location / {
			return 301 https://j8a802.p.ssafy.io;
		}
    }

    server {
		listen 443 ssl;
		listen [::]:443 ssl;
		server_name j8a802.p.ssafy.io;

		access_log /var/log/nginx/access.log;
		error_log /var/log/nginx/error.log;

		ssl_certificate /etc/letsencrypt/live/j8a802.p.ssafy.io/fullchain.pem;
		ssl_certificate_key /etc/letsencrypt/live/j8a802.p.ssafy.io/privkey.pem;


		location / {
			proxy_pass http://172.17.0.1:3000;
		}

		location /manager {
			proxy_pass http://172.17.0.1:4000;
		}



		location /api {
				rewrite ^/api(.*)$ $1 break;
				proxy_pass http://j8a802.p.ssafy.io:8000;
		}

		# location /ai {
		#         proxy_pass http://j8a802.p.ssafy.io:5000;
		#         # proxy_set_header Host $host;
		#         # proxy_set_header X-Real-IP $remote_addr;
		#         # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		# }

    }

    
}



    # include       /etc/nginx/mime.types;
    # default_type  application/octet-stream;

    # log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                   '$status $body_bytes_sent "$http_referer" '
    #                   '"$http_user_agent" "$http_x_forwarded_for"';

    # access_log  /var/log/nginx/access.log  main;

    # sendfile        on;
    #tcp_nopush     on;

    # keepalive_timeout  65;

    #gzip  on;

    # include /etc/nginx/conf.d/*.conf;

    #security
    # server_tokens off;
