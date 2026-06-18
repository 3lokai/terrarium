# Terrarium — static serve for Coolify (or any Docker host).
# In Coolify: New Resource → Dockerfile, point at this repo, set the domain
# (e.g. terrarium.gtabhishek.com). Or skip this and use Coolify's "Static" build
# pack with publish directory ./ — either works; there's no build step.
#
# The .md files (decisions, state, voice) ship public on purpose. Transparency
# is the brand: anyone can read every decision and every reversal.

FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
