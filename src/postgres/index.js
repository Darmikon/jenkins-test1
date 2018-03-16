const {extend, sql, _raw, parseUrl} = require('pg-extra')
const pg = extend(require('pg'))
 
const url = 'postgres://admin1:4wAek7bnEhrVYWLmxW30@localhost:5432/test1'
 
const pool = new pg.Pool({ ...parseUrl(url)
	//, ssl: true 
})
 
exports.findUserByUname = async function () {
  return pool.one(sql`
    SELECT *
    FROM users.users
  `)
}