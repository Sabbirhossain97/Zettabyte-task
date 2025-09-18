import { UserRound } from 'lucide-react';
import { CardProps } from '../interfaces/interface';

function Card({ title, body, userId, footer }: CardProps) {

    return (
        <div className="w-full h-full flex flex-col p-6 border rounded-lg shadow-sm bg-gray-800/50 border-gray-700">
            <div>
                <h1>
                    <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</p>
                </h1>
            </div>
            <div className='flex flex-col flex-1 justify-between'>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{body}</p>
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-2'>
                        <UserRound className='border rounded-full border-gray-500' />
                        <span className="text-sm text-muted-foreground">
                            User {userId}
                        </span>
                    </div>

                    {footer && <div>{footer} </div>}
                </div>
            </div>
        </div>
    )
}

export default Card