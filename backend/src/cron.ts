import cron from 'node-cron';
import { prisma } from './config/prisma.js';
import { userServices } from './services/user-service.js';

const updateUserStatus = () => {
	cron.schedule('0 0 * * *', async () => {
		try {
			await userServices.updateInactiveUsers();
		} catch (err) {
			console.log('Error when running cron jobs: ', err);
		}
	});
};

const startCronJobs = () => {
	updateUserStatus();
};

export default startCronJobs;
