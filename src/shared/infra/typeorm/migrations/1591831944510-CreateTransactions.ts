import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransactions1591831944510
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'value',
            type: 'numeric',
            precision: 15,
            scale: 2,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'installment',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'card_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'payment_id',
            type: 'uuid',
          },
          {
            name: 'received_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
