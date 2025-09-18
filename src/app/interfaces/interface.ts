import { ReactNode } from "react";
import { LucideIcon } from 'lucide-react';

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
}

export interface CardProps {
    title: string;
    body: string;
    id: number;
    userId: number;
    footer?: ReactNode;
}

export interface StatsCardProps {
    title: string,
    value: string,
    change: string,
    icon: LucideIcon,
    color: string,
}