import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class Keys1591932253599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionKeyToPaymentInfo',
        columnNames: ['payment_id'],
        referencedTableName: 'payments',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'received',
      new TableForeignKey({
        name: 'ReceivedKeyToTransactionInfo',
        columnNames: ['transaction_id'],
        referencedTableName: 'transactions',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'payments',
      new TableForeignKey({
        name: 'PaymentKeyToUserInfo',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('payments', 'PaymentKeyToUserInfo');

    await queryRunner.dropForeignKey(
      'received',
      'ReceivedKeyToTransactionInfo',
    );

    await queryRunner.dropForeignKey(
      'transactions',
      'TransactionKeyToPaymentInfo',
    );

    await queryRunner.dropForeignKey('cards', 'CardKeyToTransactionInfo');
  }
}
