SERVER
---
Technologies: `Typescript, Nest.JS, Postgres, TypeORM, Jest`

Run dev: `$ yarn --cwd server && yarn --cwd server dev`

Run prod: `$ docker-compose down && docker-compose up --build`

Test: `$ yarn --cwd server test`

CLIENT
---
> Picked Next.JS because the project is intended for public,
> so there should be SSR and SEO-optimization.

Technologies: `Typescript, Next.JS, React+hooks, Jest+testing library`

Run dev: `$ yarn --cwd client && yarn --cwd client dev`

Test: `$ cd client && yarn test`

> EXTRA: Internalization, Redux-toolkit with persistance, auth JWT workflow, Antd, PWA manifest
