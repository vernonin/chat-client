FROM nginx:1.16
COPY ./dist /var/www/html
COPY ./im-dashboard.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]