const sqlite3 = require('sqlite3').verbose();

class DatabaseConnector {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.db = null;
        open();
    }

    open() {
        this.db = new sqlite3.Database(path.join(__dirname, '/db/tokenbridger.db'), (err) => {
            if (err) {
                logger.error('DB connection error', err);
                process.exit();
            }
            logger.info('Connected to tokenbridge database');
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                logger.error('DB close error', err);
            }
        });
    }
  
    initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE IF NOT EXISTS lastBlock (chainId INTEGER, blockNumber TEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
            this.db.run('CREATE TABLE IF NOT EXISTS lastBlockHistory (chainId INTEGER, blockNumber TEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
            this.db.run('CREATE TABLE IF NOT EXISTS eventsLog (chainId INTEGER, blockNumber TEXT, tokenAddress TEXT, receiver TEXT, amount TEXT, symbol TEXT, blockHash TEXT, transactionHash TEXT, logIndex TEXT, decimals TEXT, granularity TEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
            this.db.run('CREATE TABLE IF NOT EXISTS logStatus (chainId INTEGER, eventLogId INTEGER, status TEXT, message TEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
            this.db.run('CREATE TABLE IF NOT EXISTS logStatusHistory (chainId INTEGER, eventLogId INTEGER, status TEXT, message TEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
        });
    }

    updateLastBlock(chainId, lastBlock) {
        this.db.serialize( () => {
            let data = [lastBlock, chainId];
            let sql = `UPDATE lastBlock
                        SET blockNumber = ?
                        WHERE chainId = ?`;
            this.db.run(sql, data);
            this.db.run('INSERT INTO lastBlockHistory VALUES()');
        });
    }

    run(sql, data) {
        this.db.run(sql, data, function(err) {
            if (err) {
            return logger.error(err.message);
            }
            this.logger.info(`Row(s) updated: ${this.changes}`);
        
        });
    }



}

module.exports = DatabaseConnector;