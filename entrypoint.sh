echo "entrypoint.sh started - Check that we have env vars "

find /app/$MODULENAME/dist \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#__WEB_DOMAIN__#$WEB_DOMAIN#g"
find /app/$MODULENAME/dist \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#__REACT_APP_PROXY_DOMAIN__#$REACT_APP_PROXY_DOMAIN#g"
find /app/$MODULENAME/dist \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#__REACT_APP_TENANT_KEY__#$REACT_APP_TENANT_KEY#g"
find /app/$MODULENAME/dist \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#__REACT_APP_KEYCLOAK_DOMAIN__#$REACT_APP_KEYCLOAK_DOMAIN#g"
find /app/$MODULENAME/dist \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#__REACT_APP_N8N_HOST_URL__#$REACT_APP_N8N_HOST_URL#g"

echo "$WEB_DOMAIN"
echo "$REACT_APP_PROXY_DOMAIN"
echo "$REACT_APP_TENANT_KEY"
echo "$REACT_APP_KEYCLOAK_DOMAIN"
echo "$REACT_APP_N8N_HOST_URL"

echo "entrypoint.sh finished ..."
exec "$@"
