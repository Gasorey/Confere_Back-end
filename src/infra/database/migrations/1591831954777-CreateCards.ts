import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCards1591831954777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'number',
            type: 'numeric',
          },
          {
            name: 'expiry',
            type: 'varchar',
          },
          {
            name: 'cvv',
            type: 'varchar',
          },
          {
            name: 'holder',
            type: 'varchar',
          },
          {
            name: 'transaction_id',
            type: 'uuid',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards');
  }
}
