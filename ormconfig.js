module.exports = [
  {
    type: "postgres",
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: "gobarber",
    entities: [
      `./${process.env.TYPEORM_ROOT_ENTITIES}/modules/**/infra/typeorm/entities/*.${process.env.TYPEORM_ENTITIES_EXTENSION}`
    ],
    migrations: [
      `./${process.env.TYPEORM_ROOT_MIGRATIONS}/shared/infra/typeorm/migrations/*.${process.env.TYPEORM_MIGRATIONS_EXTENSION}`
    ],
    cli: {
      migrationsDir: `./${process.env.TYPEORM_ROOT_MIGRATIONS}/shared/infra/typeorm/migrations`
    }
  },
  {
    name: "mongo",
    type: "mongodb",
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: "gobarber",
    useUnifiedTopology: true,
    entities: [
      `./${process.env.TYPEORM_ROOT_ENTITIES}/modules/**/infra/typeorm/schemas/*.${process.env.TYPEORM_ENTITIES_EXTENSION}`
    ]
  }
]
