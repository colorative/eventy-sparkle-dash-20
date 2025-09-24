import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Edit3, Upload, X, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNavigate, useParams } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  content: string;
  image?: string;
  date: string;
}

// Sample notes data (in a real app, this would come from your data store)
const sampleNotes: Note[] = [{
  id: "1",
  title: "Meeting Notes - Q4 Planning",
  content: "Discussed quarterly objectives and key deliverables. Need to focus on user engagement metrics and product roadmap alignment.\n\nKey Points:\n- Review current KPIs\n- Set Q4 targets\n- Align team resources\n- Schedule follow-up meetings\n\nAction Items:\n- Create detailed project timeline\n- Assign team leads\n- Set up weekly check-ins",
  date: "2024-01-15"
}, {
  id: "2",
  title: "Event Ideas",
  content: "Brainstorming session for upcoming company retreat. Consider team building activities, venue options, and catering preferences.\n\nPotential Activities:\n- Outdoor team challenges\n- Workshop sessions\n- Networking dinners\n- Recreation time\n\nVenue Requirements:\n- Capacity for 50+ people\n- Audio/visual equipment\n- Breakout rooms\n- Catering facilities",
  date: "2024-01-12"
}, {
  id: "3",
  title: "Technical Research",
  content: "Investigating new frameworks for the mobile application. React Native vs Flutter comparison, performance benchmarks.\n\nReact Native Pros:\n- Code reusability\n- Large community\n- Facebook backing\n\nFlutter Pros:\n- Better performance\n- Rich UI components\n- Google support\n\nNext Steps:\n- Create prototype in both\n- Performance testing\n- Team training requirements",
  date: "2024-01-10"
}, {
  id: "4",
  title: "AI Development Workshop",
  content: "Notes from today's AI development workshop. The session covered fundamental concepts in machine learning and artificial intelligence that will be crucial for our upcoming projects.\n\nKey Topics Covered:\n- Neural network architectures and their applications\n- Deep learning frameworks comparison (TensorFlow vs PyTorch)\n- Data preprocessing techniques for ML models\n- Model evaluation and validation strategies\n- Deployment considerations for AI systems\n\nPractical Implementation:\n- Hands-on coding exercises with Python\n- Building a simple neural network from scratch\n- Working with real datasets\n- Best practices for model training\n\nNext Steps:\n- Apply these concepts to our current project\n- Set up development environment\n- Schedule follow-up sessions\n- Create team knowledge sharing sessions",
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  date: "2024-01-08"
}];

export const NoteDetails: React.FC = () => {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState<Note | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Find the note by ID (in a real app, this would be an API call)
    const foundNote = sampleNotes.find(n => n.id === noteId);
    if (foundNote) {
      setNote(foundNote);
      setEditedNote(foundNote);
    }
  }, [noteId]);

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
    if (e.dataTransfer.files && e.dataTransfer.files[0] && editedNote) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setEditedNote({
          ...editedNote,
          image: URL.createObjectURL(file)
        });
        setHasChanges(true);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editedNote) {
      const file = e.target.files[0];
      setEditedNote({
        ...editedNote,
        image: URL.createObjectURL(file)
      });
      setHasChanges(true);
    }
  };

  const removeImage = () => {
    if (editedNote) {
      setEditedNote({
        ...editedNote,
        image: undefined
      });
      setHasChanges(true);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedNote) {
      setNote(editedNote);
      setIsEditing(false);
      setHasChanges(false);
      // In a real app, you would save to your backend here
      console.log('Saving note:', editedNote);
    }
  };

  const handleCancel = () => {
    setEditedNote(note);
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleChange = (field: keyof Note, value: string) => {
    if (editedNote) {
      setEditedNote({
        ...editedNote,
        [field]: value
      });
      setHasChanges(true);
    }
  };

  const handleDeleteNote = () => {
    // In a real app, you would delete from your backend here
    console.log('Deleting note:', note?.id);
    navigate('/notes');
  };

  if (!note || !editedNote) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Note not found
          </h3>
          <Button onClick={() => navigate('/notes')}>
            Back to Notes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/notes')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </Button>
        
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <Button 
                onClick={handleEdit} 
                className="flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
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
                      onClick={handleDeleteNote}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                className="flex items-center gap-2" 
                disabled={!hasChanges}
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Note Content */}
      <div className="space-y-6">
        {/* Image Section - Left aligned */}
        {isEditing ? (
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
            {editedNote.image ? (
              <div className="relative">
                <img 
                  src={editedNote.image} 
                  alt="Note image" 
                  className="max-h-64 mx-auto rounded" 
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={removeImage} 
                  className="mt-2 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
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
        ) : editedNote.image ? (
          <div className="text-left">
            <img 
              src={editedNote.image} 
              alt="Note image" 
              className="max-h-64 rounded-lg shadow-sm" 
            />
          </div>
        ) : null}

        {/* Title */}
        {isEditing ? (
          <Input 
            value={editedNote.title} 
            onChange={e => handleChange('title', e.target.value)} 
            className="text-2xl font-bold border-none shadow-none p-0 focus-visible:ring-0" 
            placeholder="Note title..." 
          />
        ) : (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editedNote.title}
          </h1>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {editedNote.date}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          {isEditing ? (
            <Textarea 
              value={editedNote.content} 
              onChange={e => handleChange('content', e.target.value)} 
              rows={20} 
              className="resize-none" 
              placeholder="Write your note content here..." 
            />
          ) : (
            <div className="prose max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                {editedNote.content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
