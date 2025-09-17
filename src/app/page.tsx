'use client'
import { motion } from 'framer-motion';
import { TrendingUp, Users, FileText, Activity } from 'lucide-react';

const stats = [
  {
    title: 'Total Posts',
    value: '2,847',
    change: '+12.5%',
    icon: FileText,
    color: 'text-blue-500',
  },
  {
    title: 'Active Users',
    value: '1,423',
    change: '+8.2%',
    icon: Users,
    color: 'text-green-500',
  },
  {
    title: 'Engagement',
    value: '94.7%',
    change: '+3.1%',
    icon: Activity,
    color: 'text-violet-500',
  },
  {
    title: 'Growth Rate',
    value: '23.4%',
    change: '+15.3%',
    icon: TrendingUp,
    color: 'text-green-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="space-y-8 p-10 w-full">
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
          Monitor your application's performance and manage your content with ease.
          Here's an overview of your current metrics.
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
            <div className="relative overflow-hidden border border-zinc-700 bg-slate-800/50 p-4 rounded-md">
              <motion.div
                className="absolute inset-0 bg-gradient-primary opacity-0 hover:opacity-10 transition-opacity duration-300"
                whileHover={{ opacity: 0.1 }}
              />
              <div className="flex flex-row items-center justify-between space-y-0 pb-8">
                <div className="text-sm font-semibold text-gray-400">
                  {stat.title}
                </div>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-success text-green-500 font-normal flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}


