import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateReceived1591932249076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'received',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'transaction_id',
            type: 'uuid',
          },
          {
            name: 'received_date',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('received');
  }
}
