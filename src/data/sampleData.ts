import { supabase } from '../lib/supabaseClient'; // Ensure this path is correct
import { Project } from '../types'; // Your Project interface with camelCase keys

// ✅ Sample data (UUIDs should match actual Supabase DB entries)
export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'NextGen Diary - Smart Journal System',
    description: 'An IoT-based smart diary system that combines traditional journaling with modern technology. Features voice commands, mood tracking, and automated environmental context recording.',
    category: 'IoT',
    price: 49999,
    image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    imageUpload: null,
    features: [
      'Voice command journaling',
      'Mood tracking with environmental sensors',
      'Automated time and location tagging',
      'Mobile app integration',
      'Cloud backup and sync',
      'Privacy-focused encryption'
    ],
    technicalDetails: 'Built with Arduino Nano 33 IoT, custom PCB design, React Native mobile app, and Node.js backend. Includes complete documentation and setup guide.',
    featured: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'EvalUT - Blockchain Evaluation System',
    description: 'A blockchain-based academic evaluation system that ensures transparency and immutability of student records, grades, and certifications.',
    category: 'Blockchain',
    price: 149999,
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    imageUpload: null,
    features: [
      'Immutable academic records',
      'Smart contract-based grade submission',
      'Automated certificate generation',
      'Multi-stakeholder verification',
      'Integration with existing systems',
      'Detailed audit trails'
    ],
    technicalDetails: 'Developed using Ethereum blockchain, Solidity smart contracts, React.js frontend, and Node.js backend. Includes API documentation and deployment guides.',
    featured: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Modern College Website',
    description: 'A comprehensive college website with modern design, advanced features, and seamless integration capabilities for academic management.',
    category: 'Web',
    price: 99999,
    image: 'https://images.pexels.com/photos/1036841/pexels-photo-1036841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    imageUpload: null,
    features: [
      'Responsive design',
      'Student portal integration',
      'Course management system',
      'Events calendar',
      'Faculty profiles',
      'Online admission system'
    ],
    technicalDetails: 'Built with React.js, Node.js, Express, MongoDB, and AWS services. Includes CMS integration and admin dashboard.',
    featured: true,
    updatedAt: new Date().toISOString()
  }
];

// ✅ Utility: camelCase ➝ snake_case deep conversion
function camelToSnakeDeep(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnakeDeep);
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        newObj[snakeKey] = camelToSnakeDeep(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

// ✅ Update project function
export async function updateProject(project: Partial<Project> & { id: string }) {
  const { id, ...rest } = project;
  const updateData = camelToSnakeDeep(rest);

  const { data, error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('❌ Error updating project:', error.message);
    throw error;
  } else {
    console.log('✅ Project updated:', data);
    return data;
  }
}

// ✅ Example usage
updateProject({
  id: '4e468647-e418-426b-9619-e1db14c9ff69', // Replace with actual UUID from your DB
  title: 'Updated Title',
  description: 'Updated description...',
  category: 'IoT',
  price: 60000,
  image: 'https://updated-image.com/photo.jpg',
  features: ['Updated feature 1', 'Updated feature 2'],
  technicalDetails: 'Updated technical details...',
  featured: false,
  updatedAt: new Date().toISOString()
});
