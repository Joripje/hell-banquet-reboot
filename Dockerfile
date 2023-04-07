FROM nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf
# COPY /etc/nginx/fullchain.pem /etc/nginx/
# COPY /etc/nginx/privkey.pem /etc/nginx/

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
