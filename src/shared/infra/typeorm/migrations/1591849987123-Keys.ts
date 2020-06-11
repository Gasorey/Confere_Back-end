import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class Keys1591849987123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionKeyToCardInfo',
        columnNames: ['card_id'],
        referencedTableName: 'cards',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionKeyToUserInfo',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'cards',
      new TableForeignKey({
        name: 'CardKeyToTransactionInfo',
        columnNames: ['transaction_id'],
        referencedTableName: 'transactions',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cards', 'CardKeyToTransactionInfo');
    await queryRunner.dropForeignKey(
      'transactions',
      'TransactionKeyToUserInfo',
    );
    await queryRunner.dropForeignKey(
      'transactions',
      'TransactionKeyToCardInfo',
    );
  }
}
