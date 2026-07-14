import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const { exec } = await import('node:child_process');
    const { promisify } = await import('node:util');
    const execAsync = promisify(exec);

    // Stage JSON files
    await execAsync('git add content/*.json');
    
    // Commit
    try {
      await execAsync('git commit -m "update: content updated via FGN Builder"');
    } catch (commitErr: any) {
      if (commitErr.message.includes('nothing to commit') || commitErr.message.includes('no changes added to commit')) {
        return NextResponse.json({ success: true, message: 'Nenhuma alteração detectada para commitar.' });
      }
      throw commitErr;
    }
    
    // Push
    await execAsync('git push origin main');
    
    return NextResponse.json({ success: true, message: 'Publicação realizada no GitHub com sucesso!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
