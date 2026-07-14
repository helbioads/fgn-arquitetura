import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    const { settings, testimonials, projects } = await request.json();
    
    const contentDir = path.join(process.cwd(), 'content');


    // Save settings.json
    if (settings) {
      const settingsPath = path.join(contentDir, 'settings.json');
      await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
    }
    
    // Save testimonials.json
    if (testimonials) {
      const testimonialsPath = path.join(contentDir, 'testimonials.json');
      await fs.writeFile(testimonialsPath, JSON.stringify(testimonials, null, 2), 'utf-8');
    }
    
    // Save projects.json
    if (projects) {
      const projectsPath = path.join(contentDir, 'projects.json');
      await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2), 'utf-8');
    }
    
    return NextResponse.json({ success: true, message: 'Dados salvos localmente com sucesso!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
