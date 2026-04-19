import React, { useState, useEffect } from 'react';

const Scoreboard = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Aman', score: 78 },
    { id: 2, name: 'Riya', score: 45 },
    { id: 3, name: 'Karan', score: 90 },
    { id: 4, name: 'Neha', score: 32 },
  ]);

  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');

  // Derived Stats
  const totalStudents = students.length;
  const passedCount = students.filter(s => s.score >= 40).length; // Assuming 40 is pass
  const avgScore = totalStudents > 0 
    ? Math.round(students.reduce((acc, s) => acc + Number(s.score), 0) / totalStudents) 
    : 0;

  const handleAdd = () => {
    if (!newName || !newScore) return;
    setStudents([...students, { id: Date.now(), name: newName, score: Number(newScore) }]);
    setNewName('');
    setNewScore('');
  };

  const updateScore = (id, val) => {
    setStudents(students.map(s => s.id === id ? { ...s, score: Number(val) } : s));
  };

  return (
    <div className="min-h-screen bg-[#020808] text-[#4db6ac] font-mono p-8 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="text-[10px] tracking-[0.3em] text-[#00f2ff] opacity-70">— ACADEMIC TERMINAL V2.0</p>
          <h1 className="text-5xl font-black italic tracking-tighter">
            <span className="text-white">STUDENT</span> <span className="text-[#00f2ff] drop-shadow-[0_0_10px_#00f2ff]">SCOREBOARD</span>
          </h1>
        </header>

        {/* Register Section */}
        <div className="border border-[#1a2c2c] bg-[#051212]/80 p-1 mb-6">
          <div className="flex justify-between text-[10px] px-2 py-1 border-b border-[#1a2c2c] opacity-60">
            <span>● REGISTER STUDENT</span>
            <span>NEW ENTRY</span>
          </div>
          <div className="grid grid-cols-12 gap-0">
            <input 
              className="col-span-6 bg-transparent border-r border-[#1a2c2c] p-3 text-sm focus:outline-none" 
              placeholder="Student name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input 
              className="col-span-4 bg-transparent p-3 text-sm focus:outline-none" 
              placeholder="Score (0-100)"
              type="number"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
            />
            <button 
              onClick={handleAdd}
              className="col-span-2 bg-[#051212] text-[#00f2ff] hover:bg-[#00f2ff] hover:text-black transition-colors font-bold"
            >
              + ADD
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'TOTAL', val: totalStudents },
            { label: 'PASSED', val: passedCount },
            { label: 'AVG SCORE', val: avgScore }
          ].map((stat, i) => (
            <div key={i} className="border border-[#1a2c2c] bg-[#051212]/80 p-4">
              <p className="text-[10px] opacity-60 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#00f2ff]">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Records Table */}
        <div className="border border-[#1a2c2c] bg-[#051212]/80">
          <div className="flex justify-between text-[10px] px-4 py-2 border-b border-[#1a2c2c] opacity-60">
            <span>STUDENT RECORDS</span>
            <span>{totalStudents} entries</span>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] opacity-40 border-b border-[#1a2c2c]">
                <th className="p-4 font-normal">NAME</th>
                <th className="p-4 font-normal">SCORE</th>
                <th className="p-4 font-normal text-center">STATUS</th>
                <th className="p-4 font-normal">UPDATE</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-[#1a2c2c]/50 group">
                  <td className={`p-4 font-bold border-l-2 ${student.score >= 40 ? 'border-[#00f2ff] text-white' : 'border-red-500 text-white'}`}>
                    {student.name}
                  </td>
                  <td className="p-4 text-[#ffeb3b] font-bold">{student.score}</td>
                  <td className="p-4 text-center">
                    <span className={`text-[10px] px-3 py-1 border rounded-sm ${
                      student.score >= 40 
                        ? 'border-emerald-500/50 text-emerald-400 bg-emerald-950/20' 
                        : 'border-red-500/50 text-red-400 bg-red-950/20'
                    }`}>
                      ● {student.score >= 40 ? 'PASS' : 'FAIL'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        defaultValue={student.score}
                        onBlur={(e) => updateScore(student.id, e.target.value)}
                        className="w-12 bg-black border border-[#1a2c2c] text-xs p-1 focus:outline-none focus:border-[#00f2ff]"
                      />
                      <button className="text-[10px] border border-[#1a2c2c] px-2 opacity-50 hover:opacity-100 transition-opacity">SAVE</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <footer className="mt-8 text-center text-[8px] tracking-[0.4em] opacity-30">
          ACADEMIC TERMINAL · SECURE SESSION
        </footer>
      </div>
    </div>
  );
};

export default Scoreboard;