/*
  # Create bookings table

  ## Summary
  Creates a table to store all appointment booking form submissions from the website.

  ## New Tables
  - `bookings`
    - `id` (uuid, primary key) - unique identifier for each booking
    - `preferred_date` (date) - patient's preferred appointment date
    - `full_name` (text) - patient or contact person's full name
    - `email` (text) - contact email address
    - `phone` (text) - contact phone number
    - `age` (integer) - patient's age
    - `relationship` (text) - relationship to patient (patient, family, friend)
    - `medical_history` (text) - optional medical history notes
    - `created_at` (timestamptz) - timestamp when booking was submitted
    - `notified` (boolean) - whether email notification was sent successfully

  ## Security
  - RLS enabled
  - Anonymous users can INSERT (to allow form submissions without login)
  - No SELECT policy for anonymous - data is private
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  preferred_date date,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  age integer,
  relationship text DEFAULT '',
  medical_history text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  notified boolean DEFAULT false
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);
