import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowLeft, Calendar, Clock, MapPin, MessageSquare, User, Bookmark, Pencil, Download, Link as LinkIcon, Linkedin, Twitter, Github, Paperclip, X } from "lucide-react"; // Added Linkedin, Twitter, Github, LinkIcon
import { Link as RouterLink } from "react-router-dom"; // Renamed Link to RouterLink
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import BoringAvatar from "boring-avatars";

export const SpeakerProfile = ({
  speaker,
  onBack
}) => {
  const [note, setNote] = useState("");
  const [noteImage, setNoteImage] = useState<File | null>(null);
  const [noteImagePreview, setNoteImagePreview] = useState<string | null>(null);
  const [savedNotes, setSavedNotes] = useState<Array<{text: string, image?: string}>>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);
  const [editNoteText, setEditNoteText] = useState("");
  const [editNoteImage, setEditNoteImage] = useState<File | null>(null);
  const [editNoteImagePreview, setEditNoteImagePreview] = useState<string | null>(null);

  const fullSpeakerData = {
    ...speaker,
    fullBio: `${speaker.name} is a ${speaker.position} at ${speaker.company} with extensive expertise in ${speaker.topics.join(', ')}. ${speaker.bio} With a passion for innovation and education, ${speaker.name.split(' ')[0]} has delivered numerous talks and workshops at major industry conferences worldwide. Prior to joining ${speaker.company}, ${speaker.name.split(' ')[0]} worked at several leading organizations where ${speaker.name.split(' ')[0].toLowerCase().includes('a') || speaker.name.split(' ')[0].toLowerCase().includes('e') || speaker.name.split(' ')[0].toLowerCase().includes('i') || speaker.name.split(' ')[0].toLowerCase().includes('o') || speaker.name.split(' ')[0].toLowerCase().includes('u') ? 'she' : 'he'} developed groundbreaking approaches to ${speaker.topics[0].toLowerCase()}.`,
    sessionDetails: [{
      title: speaker.sessions[0],
      date: "June 15, 2026",
      time: "10:00 AM - 11:30 AM",
      location: "Main Hall - Room A",
      description: `This session explores the latest developments in ${speaker.topics[0]} with practical insights and case studies. Attendees will gain a deep understanding of current trends and future directions in the field.`,
      speakers: [{
        name: speaker.name,
        role: speaker.position
      }, {
        name: "Michelle Johnson",
        role: "AI Strategist"
      }]
    }, {
      title: speaker.sessions[1] || "Industry Panel Discussion",
      date: "June 16, 2026",
      time: "2:00 PM - 3:30 PM",
      location: "Innovation Theater",
      description: `Join this interactive session to discuss key challenges and opportunities in ${speaker.topics[1] || speaker.topics[0]} with industry experts. This panel will cover practical applications and strategic insights.`,
      speakers: [{
        name: speaker.name,
        role: speaker.position
      }, {
        name: "David Chen",
        role: "CTO, TechVision"
      }, {
        name: "Samantha Wilson",
        role: "Research Director"
      }]
    }],
    files: [{
      name: `${speaker.sessions[0]} - Slide Deck.pdf`,
      size: "2.4 MB",
      date: "June 15, 2026"
    }, {
      name: `${speaker.sessions[0]} - Additional Resources.zip`,
      size: "5.1 MB",
      date: "June 15, 2026"
    }, {
      name: speaker.sessions[1] ? `${speaker.sessions[1]} - Presentation.pdf` : "Industry Panel - Materials.pdf",
      size: "3.7 MB",
      date: "June 16, 2026"
    }],
    // Using provided social links directly
    socialLinks: [
      { Icon: Linkedin, href: "https://linkedin.com/in/drsophiachen", label: "LinkedIn", color: "text-blue-600" },
      { Icon: Twitter, href: "https://twitter.com/drsophia_ai", label: "Twitter/X", color: "text-sky-500" },
      { Icon: Github, href: "https://github.com/sophiachen-ai", label: "GitHub", color: "text-gray-800 dark:text-gray-200" },
      { Icon: LinkIcon, href: "https://sophiac.ai", label: "Website", color: "text-green-600" },
    ]
  };

  const handleAddInlineNote = () => {
    setIsAddingNote(true);
  };

  const handleSaveInlineNote = () => {
    if (note.trim()) {
      const newNote = {
        text: note,
        image: noteImagePreview || undefined
      };
      setSavedNotes([...savedNotes, newNote]);
      setNote("");
      setNoteImage(null);
      setNoteImagePreview(null);
      setIsAddingNote(false);
      
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully.",
      });
    }
  };

  const handleCancelInlineNote = () => {
    setNote("");
    setNoteImage(null);
    setNoteImagePreview(null);
    setIsAddingNote(false);
  };

  const handleEditNote = (index: number) => {
    setEditingNoteIndex(index);
    setEditNoteText(savedNotes[index].text);
    setEditNoteImagePreview(savedNotes[index].image || null);
  };

  const handleSaveEditedNote = () => {
    if (editNoteText.trim() && editingNoteIndex !== null) {
      const updatedNotes = [...savedNotes];
      updatedNotes[editingNoteIndex] = {
        text: editNoteText,
        image: editNoteImagePreview || undefined
      };
      setSavedNotes(updatedNotes);
      setEditingNoteIndex(null);
      setEditNoteText("");
      setEditNoteImage(null);
      setEditNoteImagePreview(null);
      
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully.",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingNoteIndex(null);
    setEditNoteText("");
    setEditNoteImage(null);
    setEditNoteImagePreview(null);
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
    
    toast({
      title: "Note deleted",
      description: "Your note has been deleted successfully.",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (isEdit) {
          setEditNoteImage(file);
          setEditNoteImagePreview(imageUrl);
        } else {
          setNoteImage(file);
          setNoteImagePreview(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (isEdit = false) => {
    if (isEdit) {
      setEditNoteImage(null);
      setEditNoteImagePreview(null);
    } else {
      setNoteImage(null);
      setNoteImagePreview(null);
    }
  };

  return <div className="bg-white dark:bg-gray-900 flex flex-col overflow-auto items-stretch flex-1 shrink basis-[0%] p-3 max-md:max-w-full">
      <Button variant="ghost" className="flex items-center gap-1 w-fit mb-3 text-base" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
        Back to Speakers
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-4"> {/* Increased gap-x for more space */}
        {/* Left column - Speaker image and social links */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="overflow-hidden"> {/* Card only for the image */}
            <div className="w-full">
              <AspectRatio ratio={3 / 4} className="bg-gray-100 dark:bg-gray-800">
                <img src={speaker.imageUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"} alt={speaker.name} className="object-cover w-full h-full" />
              </AspectRatio>
            </div>
          </Card>
          {/* Social Links - Horizontal, icons only, under photo, no card */}
          <div className="flex space-x-4 items-center justify-start pt-2">
            {fullSpeakerData.socialLinks.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className={`hover:opacity-75 transition-opacity ${social.color}`}>
                <social.Icon size={28} strokeWidth={1.5} /> {/* Increased icon size */}
              </a>
            ))}
          </div>
        </div>
        
        {/* Right column - Content */}
        <div className="lg:col-span-3 space-y-5">
          {/* Speaker Header Section - Name, designation and action buttons */}
          <div className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-bold dark:text-white">{speaker.name}</h2>
                <p className="text-base">
                  <span className="text-gray-600 dark:text-gray-400">{speaker.position} at </span>
                  <span className="text-blue-600 dark:text-blue-400">{speaker.company}</span>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="gap-1 text-sm">
                  <MessageSquare className="h-4 w-4" />
                  Contact Speaker
                </Button>
                <Button variant="outline" size="sm" className="gap-1 text-sm" onClick={handleAddInlineNote}>
                  <Pencil className="h-4 w-4" />
                  Add Note
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 text-sm">
                  <Bookmark className="h-4 w-4" />
                  Add to Bookmarks
                </Button>
              </div>
            </div>
          </div>
          
          {/* Biography Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Biography</h3>
            <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4">
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {fullSpeakerData.fullBio}
              </p>
            </div>
          </div>
          
          {/* Notes section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Notes</h2>
                {!isAddingNote && (
                  <Button onClick={handleAddInlineNote}>
                    Add a Note
                  </Button>
                )}
              </div>
              
              {/* Inline note creation */}
              {isAddingNote && (
                <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                  {/* Textarea */}
                  <div className="mb-3">
                    <Textarea 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Write your note here..."
                      rows={3}
                    />
                  </div>
                  
                  {/* Attachment button and save/cancel buttons */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        className="hidden"
                        id="note-image-upload"
                      />
                      <label htmlFor="note-image-upload">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          type="button"
                          asChild
                        >
                          <span>
                            <Paperclip className="h-4 w-4" />
                            Attach Image
                          </span>
                        </Button>
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveInlineNote} size="sm" disabled={!note.trim()}>
                        Save
                      </Button>
                      <Button onClick={handleCancelInlineNote} variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                  
                  {/* Image preview */}
                  {noteImagePreview && (
                    <div className="mb-3">
                      <div className="relative inline-block">
                        <img 
                          src={noteImagePreview} 
                          alt="Note attachment" 
                          className="h-20 w-20 object-cover rounded-md border"
                        />
                        <button
                          onClick={() => removeImage(false)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {savedNotes.length > 0 ? (
                <div className="space-y-3">
                  {savedNotes.map((noteData, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      {editingNoteIndex === index ? (
                        <div>
                          <Textarea 
                            value={editNoteText}
                            onChange={(e) => setEditNoteText(e.target.value)}
                            className="mb-3"
                            rows={3}
                          />
                          
                          {/* Image upload section for editing */}
                          <div className="mb-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, true)}
                              className="hidden"
                              id={`edit-note-image-upload-${index}`}
                            />
                            <label htmlFor={`edit-note-image-upload-${index}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                type="button"
                                asChild
                              >
                                <span>
                                  <Paperclip className="h-4 w-4" />
                                  {editNoteImagePreview ? 'Change Image' : 'Attach Image'}
                                </span>
                              </Button>
                            </label>
                            
                            {editNoteImagePreview && (
                              <div className="mt-2 relative inline-block">
                                <img 
                                  src={editNoteImagePreview} 
                                  alt="Note attachment" 
                                  className="h-20 w-20 object-cover rounded-md border"
                                />
                                <button
                                  onClick={() => removeImage(true)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button onClick={handleSaveEditedNote} size="sm" disabled={!editNoteText.trim()}>
                              Save
                            </Button>
                            <Button onClick={handleCancelEdit} variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-gray-700 mb-2">{noteData.text}</p>
                              {noteData.image && (
                                <img 
                                  src={noteData.image} 
                                  alt="Note attachment" 
                                  className="h-20 w-20 object-cover rounded-md border mt-2"
                                />
                              )}
                            </div>
                            <div className="flex gap-1 ml-3">
                              <Button 
                                onClick={() => handleEditNote(index)} 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </Button>
                              <Button 
                                onClick={() => handleDeleteNote(index)} 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : !isAddingNote ? (
                <p className="text-gray-500 italic">No notes yet. Click "Add a Note" to create one.</p>
              ) : null}
            </CardContent>
          </Card>
          
          {/* Sessions Section - Redesigned */}
          <div>
            <h3 className="text-lg font-semibold dark:text-white mb-3">Upcoming Sessions</h3>
            <div className="space-y-3">
              {fullSpeakerData.sessionDetails.map((session, idx) => <Card key={idx} className="overflow-hidden">
                  <div className="flex">
                    {/* Colored vertical bar */}
                    <div className={`w-1.5 ${idx % 2 === 0 ? 'bg-indigo-600' : 'bg-purple-600'}`}></div>
                    
                    <CardContent className="p-4 w-full">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2 dark:text-white">{session.title}</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{session.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-base text-gray-700 dark:text-gray-300 mb-3">
                            {session.description}
                          </p>
                          
                          {/* Speakers */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500">Speakers:</span>
                            {session.speakers.map((sessionSpeaker, speakerIdx) => <div key={speakerIdx} className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 rounded-full py-1 px-2">
                                <BoringAvatar size={20} name={sessionSpeaker.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                                <span className="text-sm">{sessionSpeaker.name}</span>
                              </div>)}
                          </div>
                        </div>
                        
                        <div className="flex items-end justify-end">
                          <RouterLink to="/agenda"> {/* Changed Link to RouterLink */}
                            <Button variant="outline" size="sm" className="text-sm whitespace-nowrap">View in Schedule</Button>
                          </RouterLink>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>)}
            </div>
          </div>
          
          {/* Files Section - Removed background, added dividers */}
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Files</h3>
            <Card>
              <CardContent className="p-0"> {/* Removed padding from CardContent */}
                <div className="space-y-0">
                  {fullSpeakerData.files.map((file, idx) => <div key={idx}>
                      <div className="flex justify-between items-center p-3"> {/* Kept padding here for individual items */}
                        <div className="flex flex-col">
                          <span className="text-base font-medium dark:text-white">{file.name}</span>
                          <span className="text-sm text-gray-500">{file.size} • {file.date}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 h-8 text-sm">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </Button>
                      </div>
                      {idx < fullSpeakerData.files.length - 1 && <Separator />}
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
    </div>;
};
