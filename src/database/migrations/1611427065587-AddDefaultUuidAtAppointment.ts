import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDefaultUuidAtAppointment1611427065587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'id',
      new TableColumn({
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('appointments');

    if (hasTable) {
      console.log('hasTable: ', hasTable);
      await queryRunner.dropTable('appointments');
    }
  }
}
