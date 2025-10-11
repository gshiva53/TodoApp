FROM node:20-slim 
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable 

COPY . /TodoApp/frontend
WORKDIR /TodoApp/frontend

# For pnpm to know that it is running in an non-interactive environment 
# so uses the default behaviors
ENV CI=true
# Only install the production dependencies
RUN pnpm install --prod
RUN pnpm install 
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]

