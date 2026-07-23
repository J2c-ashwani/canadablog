CREATE TABLE subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    country VARCHAR(100),
    region VARCHAR(100),
    industry VARCHAR(100),
    is_subscribed BOOLEAN DEFAULT true,
    lead_activity JSONB,
    synced_to_sheets BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    purchase_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    order_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) NOT NULL,
    synced_to_sheets BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_purchases_email_order_id ON purchases(email, order_id);
