-- Seed data for VIDA Wellness Center

-- Insert membership plans
INSERT INTO membership_plans (name, price, duration_months, features) VALUES
('Basic', 49.00, 1, '["Access to gym equipment", "2 group classes per week", "Locker room access"]'),
('Premium', 89.00, 1, '["Unlimited gym access", "Unlimited group classes", "Personal training session", "Nutrition consultation"]'),
('Elite', 129.00, 1, '["All Premium benefits", "Weekly personal training", "Massage therapy session", "Priority class booking"]');

-- Insert classes
INSERT INTO classes (name, description, type, duration_minutes, max_capacity) VALUES
('Hatha Yoga', 'Gentle yoga focusing on basic postures and breathing', 'yoga', 60, 20),
('Vinyasa Flow', 'Dynamic yoga with flowing movements', 'yoga', 75, 15),
('Beginner Tai Chi', 'Introduction to Tai Chi movements and philosophy', 'taichi', 45, 25),
('Advanced Tai Chi', 'Advanced Tai Chi forms and applications', 'taichi', 60, 15),
('Strength Training', 'Full body strength workout with weights', 'gym', 45, 12),
('HIIT Cardio', 'High intensity interval training', 'gym', 30, 20),
('Zumba', 'Latin-inspired dance fitness', 'dance', 60, 30),
('Hip Hop Dance', 'Urban dance styles and choreography', 'dance', 45, 25);

-- Insert class schedules (sample schedule)
INSERT INTO class_schedules (class_id, instructor_name, day_of_week, start_time, end_time) 
SELECT 
  c.id,
  CASE 
    WHEN c.type = 'yoga' THEN 'Maria Rodriguez'
    WHEN c.type = 'taichi' THEN 'Chen Wei'
    WHEN c.type = 'gym' THEN 'Mike Johnson'
    WHEN c.type = 'dance' THEN 'Sofia Martinez'
  END,
  CASE 
    WHEN c.name LIKE '%Beginner%' OR c.name = 'Hatha Yoga' THEN 1 -- Monday
    WHEN c.name LIKE '%Advanced%' OR c.name = 'Vinyasa Flow' THEN 3 -- Wednesday
    WHEN c.name LIKE '%HIIT%' OR c.name = 'Hip Hop Dance' THEN 5 -- Friday
    ELSE 2 -- Tuesday
  END,
  CASE 
    WHEN c.type = 'yoga' THEN '09:00:00'
    WHEN c.type = 'taichi' THEN '07:00:00'
    WHEN c.type = 'gym' THEN '18:00:00'
    WHEN c.type = 'dance' THEN '19:30:00'
  END,
  CASE 
    WHEN c.type = 'yoga' AND c.duration_minutes = 60 THEN '10:00:00'
    WHEN c.type = 'yoga' AND c.duration_minutes = 75 THEN '10:15:00'
    WHEN c.type = 'taichi' AND c.duration_minutes = 45 THEN '07:45:00'
    WHEN c.type = 'taichi' AND c.duration_minutes = 60 THEN '08:00:00'
    WHEN c.type = 'gym' AND c.duration_minutes = 45 THEN '18:45:00'
    WHEN c.type = 'gym' AND c.duration_minutes = 30 THEN '18:30:00'
    WHEN c.type = 'dance' AND c.duration_minutes = 60 THEN '20:30:00'
    WHEN c.type = 'dance' AND c.duration_minutes = 45 THEN '20:15:00'
  END
FROM classes c;
