import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { StoryAvatar } from "@/components/attendee/StoryAvatar";
import { Bookmark, Mail, Calendar, MapPin, Link as LinkIcon, Phone, Volume2, Paperclip, X } from "lucide-react";

const AttendeeProfile = () => {
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [noteImage, setNoteImage] = useState<File | null>(null);
  const [noteImagePreview, setNoteImagePreview] = useState<string | null>(null);
  const [savedNotes, setSavedNotes] = useState<Array<{text: string, image?: string}>>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);
  const [editNoteText, setEditNoteText] = useState("");
  const [editNoteImage, setEditNoteImage] = useState<File | null>(null);
  const [editNoteImagePreview, setEditNoteImagePreview] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandBio, setExpandBio] = useState(false);
  
  // Mock data for attendee profile
  const isEmptyState = id === "1";
  
  const attendee = isEmptyState ? {
    id: id || "1",
    name: "James Willson (Empty State)",
    role: "",
    company: "",
    coverPhoto: "",
    roles: [],
    bio: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    whatsapp: "",
    interests: [],
    exhibitor: null
  } : {
    id: id || "1",
    name: "David Lee",
    role: "Chief Technology Officer",
    company: "InnovateX",
    coverPhoto: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=300&q=80",
    roles: ["Speaker", "VIP"],
    bio: "Technology leader with 15+ years in software development and cloud architecture. Passionate about leveraging AI to solve complex business problems and drive innovation across industries. Previously led engineering teams at major tech companies before joining InnovateX to spearhead their digital transformation initiatives. Expert in developing scalable solutions and mentoring junior developers to reach their full potential.",
    location: "San Francisco, CA",
    email: "david.lee@innovatex.example",
    phone: "+1 (555) 123-4567",
    website: "https://www.davidlee.example",
    facebook: "https://facebook.com/davidlee",
    twitter: "https://twitter.com/davidlee",
    linkedin: "https://linkedin.com/in/davidlee",
    whatsapp: "+15551234567",
    interests: ["Artificial Intelligence", "Cloud Computing", "Edge Computing", "Cybersecurity", "IoT", "Digital Transformation", "Machine Learning"],
    exhibitor: {
      name: "InnovateX",
      boothNumber: "A-123",
      logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=64&h=64&fit=crop&auto=format"
    }
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

  const handleAddInlineNote = () => {
    setIsAddingNote(true);
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
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? `${attendee.name} has been removed from your bookmarks` 
        : `${attendee.name} has been added to your bookmarks`,
    });
  };
  
  const scheduleMeeting = () => {
    toast({
      title: "Schedule meeting",
      description: `You're scheduling a meeting with ${attendee.name}`,
    });
  };

  const sendMessage = () => {
    toast({
      title: "Message",
      description: `Opening message composer for ${attendee.name}`,
    });
  };
  
  const speakName = () => {
    const utterance = new SpeechSynthesisUtterance(attendee.name);
    window.speechSynthesis.speak(utterance);
    
    toast({
      title: "Speaking",
      description: `Speaking ${attendee.name}`,
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

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/attendees">
            <Button variant="outline" className="gap-2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
              Back to Attendees
            </Button>
          </Link>
        </div>
        
        {/* Cover photo section with fixed aspect ratio */}
        <div className="relative mb-40">
          {/* Cover photo container with fixed dimensions and centered */}
          <div className="relative h-[300px] w-full rounded-lg overflow-hidden flex justify-center bg-gray-500">
            {isEmptyState ? (
              // Empty state placeholder
              <div className="h-[300px] w-[600px] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center z-10 relative">
                <div className="text-center">
                  <div className="h-16 w-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No cover photo uploaded</p>
                </div>
              </div>
            ) : (
              <>
                {/* Main cover photo with fixed dimensions */}
                <img 
                  src={attendee.coverPhoto} 
                  alt="Cover"
                  className="h-[300px] w-[600px] object-cover z-10 relative"
                />

                {/* Blurred background extension - modified to ensure it's visible */}
                <div 
                  className="absolute inset-0 -z-0 bg-no-repeat bg-cover bg-center" 
                  style={{ 
                    backgroundImage: `url(${attendee.coverPhoto})`,
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                  }}
                />

                {/* Darken overlay for better text visibility - reduced opacity to allow blur to show */}
                <div className="absolute inset-0 bg-black/20 z-5" />
              </>
            )}
          </div>

          {/* Avatar and name section - positioned lower below cover photo */}
          <div className="absolute -bottom-36 left-8 right-8 flex flex-row items-start justify-between z-20">
            {/* Avatar and name container - left side */}
            <div className="flex flex-col items-start z-20">
              {/* Avatar with animated ring */}
              <StoryAvatar name={attendee.name} />
              
              {/* Name and title */}
              <div className="mt-3 text-left">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">{attendee.name}</h1>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2" 
                    onClick={speakName}
                    title="Speak name"
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>
                {isEmptyState ? (
                  <p className="text-gray-500 italic">Profile not completed</p>
                ) : (
                  <p className="text-gray-600">{attendee.role} at {attendee.company}</p>
                )}
              </div>
            </div>
            
            {/* Action buttons - right side with added top padding */}
            <div className="flex items-center gap-4 pt-24">
              <Button onClick={sendMessage} className="gap-2" variant="blue">
                <Mail className="h-4 w-4" />
                Send Message
              </Button>
              <Button 
                variant="outline" 
                onClick={toggleBookmark} 
                className="gap-2"
              >
                <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button onClick={scheduleMeeting} variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Let's Meet
              </Button>
            </div>
          </div>
        </div>

        {/* Role badges */}
        {!isEmptyState && attendee.roles.length > 0 && (
          <div className="flex justify-start mb-6 mt-20 ml-8">
            <div className="flex gap-2">
              {attendee.roles.map((role, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 px-3 py-1">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Left column */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">About</h2>
                {isEmptyState ? (
                  <div className="text-center py-8">
                    <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 italic">No bio available</p>
                    <p className="text-sm text-gray-400 mt-1">This user hasn't added their bio yet</p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700">
                      {expandBio 
                        ? attendee.bio 
                        : attendee.bio.length > 150 
                          ? `${attendee.bio.substring(0, 150)}...` 
                          : attendee.bio
                      }
                    </p>
                    {attendee.bio.length > 150 && (
                      <Button 
                        variant="link" 
                        onClick={() => setExpandBio(!expandBio)} 
                        className="mt-2 p-0 h-auto"
                      >
                        {expandBio ? "Show Less" : "Read More"}
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
            
            {/* Notes section - moved between About and Interests */}
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
            
            {/* Interests section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">Interests</h2>
                {isEmptyState ? (
                  <div className="text-center py-8">
                    <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 italic">No interests added</p>
                    <p className="text-sm text-gray-400 mt-1">This user hasn't added their interests yet</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {attendee.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            {/* Contact information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                {isEmptyState ? (
                  <div className="text-center py-8">
                    <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 italic">No contact information</p>
                    <p className="text-sm text-gray-400 mt-1">This user hasn't added their contact details yet</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-500 mr-3" />
                        <a href={`mailto:${attendee.email}`} className="text-blue-600 hover:underline">
                          {attendee.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-500 mr-3" />
                        <a href={`tel:${attendee.phone}`} className="text-blue-600 hover:underline">
                          {attendee.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <LinkIcon className="h-5 w-5 text-gray-500 mr-3" />
                        <a href={attendee.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Website
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                        <span>{attendee.location}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 my-4 pt-4">
                      <h3 className="text-lg font-medium mb-3">Social Media</h3>
                      <div className="flex flex-wrap gap-3">
                        {attendee.linkedin && (
                          <a 
                            href={attendee.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                            title="LinkedIn"
                          >
                            <svg
                              className="h-5 w-5 text-gray-700"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect width="4" height="12" x="2" y="9" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          </a>
                        )}
                        
                        {attendee.twitter && (
                          <a 
                            href={attendee.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                            title="Twitter"
                          >
                            <svg
                              className="h-5 w-5 text-gray-700"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                          </a>
                        )}
                        
                        {attendee.facebook && (
                          <a 
                            href={attendee.facebook} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                            title="Facebook"
                          >
                            <svg
                              className="h-5 w-5 text-gray-700"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                          </a>
                        )}
                        
                        {attendee.whatsapp && (
                          <a 
                            href={`https://wa.me/${attendee.whatsapp.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                            title="WhatsApp"
                          >
                            <svg
                              className="h-5 w-5 text-gray-700"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            {/* Linked exhibitor */}
            {!isEmptyState && attendee.exhibitor && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Linked Exhibitor</h2>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-md overflow-hidden mr-4">
                      <img 
                        src={attendee.exhibitor.logo} 
                        alt={attendee.exhibitor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{attendee.exhibitor.name}</h3>
                      <p className="text-sm text-gray-500">Booth {attendee.exhibitor.boothNumber}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Visit Exhibitor
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AttendeeProfile;
