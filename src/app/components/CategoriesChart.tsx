import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

const categoryData = [
    { name: 'Technology', value: 32, color: 'hsl(217, 91%, 60%)' },
    { name: 'Design', value: 28, color: 'hsl(142, 71%, 45%)' },
    { name: 'Marketing', value: 24, color: 'hsl(260, 50%, 60%)' },
    { name: 'Business', value: 16, color: 'hsl(38, 92%, 50%)' },
];

function CategoriesChart() {
    return (
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
    )
}

export default CategoriesChart