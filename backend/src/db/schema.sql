-- SaaS Intelligence Database Schema

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    industry VARCHAR(100) NOT NULL,
    overview TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on industry for performance
CREATE INDEX IF NOT EXISTS idx_clients_industry ON clients(industry);

-- ClientDetails Table
CREATE TABLE IF NOT EXISTS client_details (
    id SERIAL PRIMARY KEY,
    client_id INTEGER UNIQUE NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    offerings TEXT[],
    capabilities TEXT[],
    benefits TEXT[],
    differentiators TEXT[],
    pricing TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add index on client_id for performance
CREATE INDEX IF NOT EXISTS idx_client_details_client_id ON client_details(client_id);
