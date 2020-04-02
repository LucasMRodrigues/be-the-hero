
exports.up = function(knex) {
  return knex.schema.createTable('incidents', (table) => {
      // ID Auto Increment
      table.increments();

      // Table Columns
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();
      table.string('ong_id').notNullable(); // Foreign Key
      
      // Constraints
      table.foreign('ong_id').references('id').inTable('ongs');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
