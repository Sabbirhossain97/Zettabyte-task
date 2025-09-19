'use client'
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from './constants/animationSettings';
import { stats } from "./constants/stats"
import StatsCard from './components/StatsCard';
import ActivityChart from './components/ActivityChart';
import RevenueChart from './components/RevenueChart';

export default function Home() {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-10 w-full flex-1">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <h1 className="text-5xl bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent inline-block font-bold mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          {`Monitor your application's performance and manage your content with ease.
            Here's an overview of your current metrics.`}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <StatsCard  {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <ActivityChart />
        <RevenueChart />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
      </motion.div >
    </div>
  );
}


