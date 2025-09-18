import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { StatsCardProps } from '../interfaces/interface';

function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
    return (
        <div className="relative overflow-hidden border border-gray-700 bg-slate-800/50 p-4 rounded-md">
            <motion.div
                className="absolute inset-0 bg-gradient-primary opacity-0 hover:opacity-10 transition-opacity duration-300"
                whileHover={{ opacity: 0.1 }}
            />
            <div className="flex flex-row items-center justify-between space-y-0 pb-8">
                <div className="text-sm font-semibold text-gray-400">
                    {title}
                </div>
                <div className={`h-5 w-5 ${color}`} > <Icon /></div>
            </div>
            <div>
                <div className="text-3xl font-bold text-foreground mb-1">
                    {value}
                </div>
                <p className="text-sm text-success text-green-500 font-normal flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {change} from last month
                </p>
            </div>
        </div>
    )
}

export default StatsCard