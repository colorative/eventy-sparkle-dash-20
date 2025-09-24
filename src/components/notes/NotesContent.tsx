import React, { useState } from "react";
import { Plus, Search, Calendar, Image, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  content: string;
  image?: string;
  date: string;
}

// Sample notes data
const sampleNotes: Note[] = [{
  id: "1",
  title: "Meeting Notes - Q4 Planning",
  content: "Discussed quarterly objectives and key deliverables. Need to focus on user engagement metrics and product roadmap alignment...",
  date: "2024-01-15"
}, {
  id: "2",
  title: "Event Ideas",
  content: "Brainstorming session for upcoming company retreat. Consider team building activities, venue options, and catering preferences...",
  date: "2024-01-12"
}, {
  id: "3",
  title: "Technical Research",
  content: "Investigating new frameworks for the mobile application. React Native vs Flutter comparison, performance benchmarks...",
  date: "2024-01-10"
}, {
  id: "4",
  title: "AI Development Workshop",
  content: "Notes from today's AI development workshop. Covered machine learning fundamentals, neural networks, and practical implementation strategies for our upcoming projects...",
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  date: "2024-01-08"
}];

export const NotesContent: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  });
  const [dragActive, setDragActive] = useState(false);
  const [attachedImage, setAttachedImage] = useState<File | null>(null);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setAttachedImage(file);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedImage(e.target.files[0]);
    }
  };

  const removeAttachedImage = () => {
    setAttachedImage(null);
  };

  const handleCreateNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        image: attachedImage ? URL.createObjectURL(attachedImage) : undefined,
        date: new Date().toISOString().split('T')[0]
      };
      setNotes([note, ...notes]);
      setNewNote({
        title: "",
        content: ""
      });
      setAttachedImage(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleNoteClick = (noteId: string) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notes</h1>
          <p className="text-gray-600 dark:text-gray-400">Capture and organize your thoughts</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input 
                placeholder="Note title..." 
                value={newNote.title} 
                onChange={e => setNewNote({
                  ...newNote,
                  title: e.target.value
                })} 
              />
              
              <Textarea 
                placeholder="Write your note content here..." 
                value={newNote.content} 
                onChange={e => setNewNote({
                  ...newNote,
                  content: e.target.value
                })} 
                rows={4} 
                className="resize-none" 
              />
              
              {/* Drag and Drop Area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {attachedImage ? (
                  <div className="relative">
                    <img 
                      src={URL.createObjectURL(attachedImage)} 
                      alt="Attached" 
                      className="max-h-32 mx-auto rounded" 
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={removeAttachedImage} 
                      className="mt-2"
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Drag and drop an image here, or{" "}
                      <label className="text-blue-600 cursor-pointer hover:underline">
                        browse
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="hidden" 
                        />
                      </label>
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNote}>
                  Create Note
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search notes..." 
          className="pl-9" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map(note => (
          <Card key={note.id} className="p-4 hover:shadow-md transition-shadow relative">
            {note.image && (
              <img 
                src={note.image} 
                alt="Note attachment" 
                className="w-full h-32 object-cover rounded mb-3" 
              />
            )}
            
            <div className="flex items-start justify-between mb-2">
              <h3 
                className="font-semibold text-gray-900 dark:text-white line-clamp-1 cursor-pointer flex-1"
                onClick={() => handleNoteClick(note.id)}
              >
                {note.title}
              </h3>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Note</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{note.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleDeleteNote(note.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <p 
              className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3 cursor-pointer"
              onClick={() => handleNoteClick(note.id)}
            >
              {note.content}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {note.date}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No notes found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? "Try adjusting your search terms" : "Create your first note to get started"}
          </p>
        </div>
      )}
    </div>
  );
};
