'use client'
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from './constants/animationSettings';
import { stats } from "./constants/stats"
import StatsCard from './components/StatsCard';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const activityData = [
  { name: 'Jan', users: 1200, posts: 2400, engagement: 85 },
  { name: 'Feb', users: 1400, posts: 2100, engagement: 88 },
  { name: 'Mar', users: 1100, posts: 2800, engagement: 90 },
  { name: 'Apr', users: 1600, posts: 2200, engagement: 92 },
  { name: 'May', users: 1800, posts: 2600, engagement: 89 },
  { name: 'Jun', users: 1423, posts: 2847, engagement: 95 },
];

const revenueData = [
  { name: 'Jan', revenue: 12000, growth: 8 },
  { name: 'Feb', revenue: 15000, growth: 12 },
  { name: 'Mar', revenue: 18000, growth: 18 },
  { name: 'Apr', revenue: 22000, growth: 25 },
  { name: 'May', revenue: 26000, growth: 32 },
  { name: 'Jun', revenue: 31000, growth: 40 },
];

const categoryData = [
  { name: 'Technology', value: 32, color: 'hsl(217, 91%, 60%)' },
  { name: 'Design', value: 28, color: 'hsl(142, 71%, 45%)' },
  { name: 'Marketing', value: 24, color: 'hsl(260, 50%, 60%)' },
  { name: 'Business', value: 16, color: 'hsl(38, 92%, 50%)' },
];

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
        <div className="p-6 border border-gray-700 bg-slate-800/50 rounded-md">
          <div>
            <div className="text-xl">Activity Trends</div>
          </div>
          <div>
            <div className="h-64 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 20%)" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(240 5% 65%)"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(240 5% 65%)"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(240 10% 8%)',
                      border: '1px solid hsl(240 6% 20%)',
                      borderRadius: '8px',
                      color: 'hsl(0 0% 98%)'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(217 91% 60%)"
                    strokeWidth={2}
                    name="Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="posts"
                    stroke="hsl(142 71% 45%)"
                    strokeWidth={2}
                    name="Posts"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="p-6 border border-gray-700 bg-slate-800/50 rounded-md">
          <div>
            <div className="text-xl">Revenue Growth</div>
          </div>
          <div>
            <div className="h-64 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 20%)" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(240 5% 65%)"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(240 5% 65%)"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(240 10% 8%)',
                      border: '1px solid hsl(240 6% 20%)',
                      borderRadius: '8px',
                      color: 'hsl(0 0% 98%)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(260 50% 60%)"
                    fill="hsl(260 50% 60% / 0.3)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="p-6 border border-gray-700 bg-slate-800/50 rounded-md">
          <div>
            <div className="text-xl">Content Categories</div>
          </div>
          <div>
            <div className="h-64 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 20%)" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(240 5% 65%)"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(240 5% 65%)"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(240 10% 8%)',
                      border: '1px solid hsl(240 6% 20%)',
                      borderRadius: '8px',
                      color: 'hsl(0 0% 98%)'
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="hsl(217 91% 60%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div >
    </div>
  );
}


