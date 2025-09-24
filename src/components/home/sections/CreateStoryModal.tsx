
import React, { useState, useCallback, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { Upload, Image as ImageIcon, Video, X, Eye, Users, Globe, Trash2, Play, Pause, RotateCcw, ArrowRight, Scissors } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Point {
  x: number;
  y: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CreateStoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish: (story: StoryData) => void;
}

export interface StoryData {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  visibility: 'everyone' | 'friends';
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  views: number;
  isOwn: boolean;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  open,
  onOpenChange,
  onPublish
}) => {
  const [step, setStep] = useState<'upload' | 'crop' | 'details'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [caption, setCaption] = useState('');
  const [visibility, setVisibility] = useState<'everyone' | 'friends'>('everyone');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Cropping states
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Video trimming states
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  const [videoEndTime, setVideoEndTime] = useState(60); // Max 1 minute
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoThumbnail, setVideoThumbnail] = useState<string>('');
  const [isDragging, setIsDragging] = useState<'start' | 'end' | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const generateVideoThumbnail = useCallback((videoElement: HTMLVideoElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    if (ctx) {
      ctx.drawImage(videoElement, 0, 0);
      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
      setVideoThumbnail(thumbnailUrl);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      setMediaType(type);
      setFile(file);
      
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      if (type === 'video') {
        // Load video metadata to get duration and generate thumbnail
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
          const duration = Math.min(video.duration, 60); // Max 1 minute
          setVideoDuration(duration);
          setVideoEndTime(duration);
          
          // Generate thumbnail from first frame
          video.currentTime = 0;
          video.onseeked = () => {
            generateVideoThumbnail(video);
          };
        };
        video.src = url;
      }
      
      setStep('crop');
    }
  }, [generateVideoThumbnail]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB
  });

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedMedia = useCallback(async (): Promise<string> => {
    if (!file || !croppedAreaPixels) return '';

    if (mediaType === 'image') {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        
        image.onload = () => {
          // Story aspect ratio 9:16
          const targetWidth = 360;
          const targetHeight = 640;
          
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          
          if (ctx) {
            ctx.drawImage(
              image,
              croppedAreaPixels.x,
              croppedAreaPixels.y,
              croppedAreaPixels.width,
              croppedAreaPixels.height,
              0,
              0,
              targetWidth,
              targetHeight
            );
          }
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            }
          }, 'image/jpeg', 0.9);
        };
        
        image.src = fileUrl;
      });
    } else {
      // For video, create a trimmed version
      return new Promise((resolve) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        video.onloadeddata = () => {
          canvas.width = 360; // Story width
          canvas.height = 640; // Story height
          
          video.currentTime = videoStartTime;
          video.onseeked = () => {
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
            
            // For now, return the original video URL as trimming requires more complex implementation
            // In a real app, you'd use FFmpeg.js or similar for video processing
            resolve(fileUrl);
          };
        };
        
        video.src = fileUrl;
      });
    }
  }, [file, croppedAreaPixels, fileUrl, mediaType, videoStartTime]);

  const handleNext = async () => {
    if (step === 'crop') {
      const croppedUrl = await createCroppedMedia();
      setPreviewUrl(croppedUrl);
      setStep('details');
    }
  };

  const handlePublish = async () => {
    if (!file) return;
    
    // For videos, ensure we have valid timing
    if (mediaType === 'video' && (videoEndTime - videoStartTime) > 60) {
      toast({
        title: "Video too long",
        description: "Please trim your video to 60 seconds or less.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Wait for upload to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create final URL
    const finalUrl = previewUrl || fileUrl;

    const story: StoryData = {
      id: Date.now().toString(),
      type: mediaType,
      url: finalUrl,
      caption: caption.trim() || undefined,
      visibility,
      author: {
        name: 'You', // In real app, this would come from user context
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face'
      },
      createdAt: new Date(),
      views: 0,
      isOwn: true
    };

    onPublish(story);
    
    toast({
      title: "Story published!",
      description: "Your story is now visible to others for 24 hours."
    });

    // Reset form
    setFile(null);
    setFileUrl('');
    setPreviewUrl('');
    setVideoThumbnail('');
    setCaption('');
    setStep('upload');
    setIsUploading(false);
    setUploadProgress(0);
    onOpenChange(false);
  };

  const handleClose = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    if (previewUrl && previewUrl !== fileUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (videoThumbnail) {
      URL.revokeObjectURL(videoThumbnail);
    }
    setFile(null);
    setFileUrl('');
    setPreviewUrl('');
    setVideoThumbnail('');
    setCaption('');
    setStep('upload');
    setIsUploading(false);
    setUploadProgress(0);
    onOpenChange(false);
  };

  const handleSliderChange = (values: number[]) => {
    setVideoStartTime(values[0]);
    setVideoEndTime(Math.min(values[1], values[0] + 60)); // Max 60s duration
  };

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="flex justify-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <ImageIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Video className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-lg font-medium">
              {isDragActive ? 'Drop your media here' : 'Upload your story'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supports images and videos up to 100MB
            </p>
          </div>
        </div>
      </div>
      
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="w-full"
      >
        <Upload className="h-4 w-4 mr-2" />
        Choose File
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onDrop([file]);
          }
        }}
      />
    </div>
  );

  const renderCropStep = () => (
    <div className="space-y-4">
      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
        {mediaType === 'image' ? (
          <Cropper
            image={fileUrl}
            crop={crop}
            zoom={zoom}
            aspect={9/16}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {videoThumbnail ? (
              <img
                src={videoThumbnail}
                alt="Video thumbnail"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white">
                <Video className="h-16 w-16 opacity-50" />
              </div>
            )}
            <video
              ref={videoRef}
              src={fileUrl}
              className="absolute inset-0 w-full h-full object-contain opacity-0"
              controls={false}
              muted
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  const duration = Math.min(videoRef.current.duration, 60);
                  setVideoDuration(duration);
                  setVideoEndTime(duration);
                  generateVideoThumbnail(videoRef.current);
                }
              }}
              onTimeUpdate={() => {
                if (videoRef.current) {
                  setCurrentTime(videoRef.current.currentTime);
                }
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 space-y-3">
              <div className="flex items-center justify-between text-white text-xs">
                <span>{Math.floor(videoStartTime)}s</span>
                <span>{Math.floor(videoEndTime - videoStartTime)}s duration</span>
                <span>{Math.floor(videoEndTime)}s</span>
              </div>
              <div className="space-y-3">
                <Label className="text-white text-sm">Trim Video (Max 60s)</Label>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 space-y-4">
                  <div className="relative">
                    <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ 
                          marginLeft: `${(videoStartTime / videoDuration) * 100}%`,
                          width: `${((videoEndTime - videoStartTime) / videoDuration) * 100}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div
                        className="w-4 h-4 bg-primary rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-110 transition-transform"
                        style={{ marginLeft: `${(videoStartTime / videoDuration) * 100}%` }}
                        onMouseDown={() => setIsDragging('start')}
                      />
                      <div
                        className="w-4 h-4 bg-primary rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-110 transition-transform"
                        style={{ marginRight: `${((videoDuration - videoEndTime) / videoDuration) * 100}%` }}
                        onMouseDown={() => setIsDragging('end')}
                      />
                    </div>
                    <Slider
                      value={[videoStartTime, videoEndTime]}
                      onValueChange={handleSliderChange}
                      max={videoDuration}
                      min={0}
                      step={0.1}
                      className="w-full mt-2"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        if (videoRef.current) {
                          if (isPlaying) {
                            videoRef.current.pause();
                          } else {
                            videoRef.current.currentTime = videoStartTime;
                            videoRef.current.play();
                          }
                          setIsPlaying(!isPlaying);
                        }
                      }}
                    >
                      {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = videoStartTime;
                          setCurrentTime(videoStartTime);
                        }
                      }}
                    >
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {mediaType === 'image' && (
        <div className="space-y-2">
          <Label htmlFor="zoom" className="text-sm">Zoom</Label>
          <input
            id="zoom"
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}
      
      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => setStep('upload')} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          {mediaType === 'video' ? (
            <>
              <Scissors className="h-4 w-4 mr-2" />
              Trim & Next
            </>
          ) : (
            <>
              <ArrowRight className="h-4 w-4 mr-2" />
              Next
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6">
      {/* Preview */}
      <div className="space-y-2">
        <Label>Preview</Label>
        <div className="relative w-32 h-56 bg-gray-100 rounded-lg overflow-hidden mx-auto">
          {mediaType === 'image' ? (
            <img
              src={previewUrl}
              alt="Story preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full">
              {videoThumbnail ? (
                <img
                  src={videoThumbnail}
                  alt="Video preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={previewUrl}
                  className="w-full h-full object-cover"
                  muted
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-2">
                  <Play className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="caption">Caption (optional)</Label>
          <span className="text-xs text-gray-500">
            {caption.length}/250
          </span>
        </div>
        <Textarea
          id="caption"
          placeholder="Write a caption for your story..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          maxLength={250}
        />
      </div>

      {/* Visibility */}
      <div className="space-y-2">
        <Label>Visibility</Label>
        <Select value={visibility} onValueChange={(value: 'everyone' | 'friends') => setVisibility(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyone">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Everyone</span>
              </div>
            </SelectItem>
            <SelectItem value="friends">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Friends only</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Story will be visible for 24 hours
        </p>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm">Uploading...</Label>
            <span className="text-sm text-gray-500">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={() => setStep('crop')}
          className="flex-1"
          disabled={isUploading}
        >
          Back
        </Button>
        <Button
          onClick={handlePublish}
          className="flex-1"
          disabled={isUploading}
        >
          {isUploading ? 'Publishing...' : 'Publish Story'}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Create Your Story</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {step === 'upload' && renderUploadStep()}
          {step === 'crop' && renderCropStep()}
          {step === 'details' && renderDetailsStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
