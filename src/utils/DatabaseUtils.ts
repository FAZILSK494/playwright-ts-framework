import { Pool } from 'pg';

export class DatabaseUtil {
    private static pool: Pool;

    /**
     * Initializes the connection pool using the active environment variables.
     * This is private to enforce a Singleton pattern design.
     */
    private static getPool(): Pool {
        if (!this.pool) {
            this.pool = new Pool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: parseInt(process.env.DB_PORT || '5432', 10),
                max: 10,                 // Maximum active connections in the pool
                idleTimeoutMillis: 30000,// Close idle connections after 30 seconds
                connectionTimeoutMillis: 5000, // Timeout connection attempts after 5 seconds
            });

            // Error handling for backend drops
            this.pool.on('error', (err) => {
                console.error('Unexpected error on idle database client:', err.message);
            });
        }
        return this.pool;
    }

    /**
     * Executes a single SQL query against the database context.
     * Automatically retrieves and returns a client thread back to the pool.
     * @param queryText The SQL statement string (e.g., 'SELECT * FROM users WHERE id = $1')
     * @param params Optional array of parameter strings to prevent SQL Injection
     */
    public static async executeQuery<T = any>(queryText: string, params: any[] = []): Promise<T[]> {
        const pool = this.getPool();
        try {
            const result = await pool.query(queryText, params);
            return result.rows;
        } catch (error: any) {
            console.error(`Database Query Failed Execution. Statement: [${queryText}]`);
            throw new Error(`DB Error: ${error.message}`);
        }
    }

    /**
     * Gracefully terminates all active connections in the pool.
     * Essential for a clean teardown at the end of the full test suite run.
     */
    public static async closePool(): Promise<void> {
        if (this.pool) {
            await this.pool.end();
            console.log('Database connection pool terminated cleanly.');
        }
    }
}
