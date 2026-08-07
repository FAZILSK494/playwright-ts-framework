import { DatabaseUtil } from './DatabaseUtil';

async function globalTeardown() {
    // Terminate DB pools globally after all browser tests across all workers finish
    await DatabaseUtil.closePool();
}
export default globalTeardown;
