import {
    ResponsiveContainer,
    LineChart,
    Line,
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

function ActivityChart() {
    return (
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
    )
}

export default ActivityChart