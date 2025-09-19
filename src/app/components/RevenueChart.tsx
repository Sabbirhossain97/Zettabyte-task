import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

const revenueData = [
    { name: 'Jan', revenue: 12000, growth: 8 },
    { name: 'Feb', revenue: 15000, growth: 12 },
    { name: 'Mar', revenue: 18000, growth: 18 },
    { name: 'Apr', revenue: 22000, growth: 25 },
    { name: 'May', revenue: 26000, growth: 32 },
    { name: 'Jun', revenue: 31000, growth: 40 },
];

function RevenueChart() {
    return (
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
    )
}

export default RevenueChart