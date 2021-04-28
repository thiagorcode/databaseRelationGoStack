import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOrderProduct1619533787879
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orderProduct',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'price',
            type: 'decimal',
          },
          {
            name: 'quantity',
            type: 'decimal',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'orderProduct',
      new TableForeignKey({
        name: 'orderP_Product',
        columnNames: ['product_id'],
        referencedTableName: 'product',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'orderProduct',
      new TableForeignKey({
        name: 'orderP_order',
        columnNames: ['order_id'],
        referencedTableName: 'order',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('orderProduct', [
      new TableForeignKey({
        name: 'orderP_order',
        columnNames: ['order_id'],
        referencedTableName: 'order',
        referencedColumnNames: ['id'],
      }),
      new TableForeignKey({
        name: 'orderP_Product',
        columnNames: ['product_id'],
        referencedTableName: 'product',
        referencedColumnNames: ['id'],
      }),
    ]);
    await queryRunner.dropTable('orderProduct');
  }
}
