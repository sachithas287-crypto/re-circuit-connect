import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Star, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    feedback_type: '',
    subject: '',
    message: '',
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

  const feedbackTypes = [
    { value: 'service', label: 'Service Experience' },
    { value: 'pickup', label: 'Pickup Process' },
    { value: 'recycling_center', label: 'Recycling Center' },
    { value: 'app', label: 'App & Website' },
    { value: 'general', label: 'General Feedback' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit feedback.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!formData.feedback_type || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            user_id: user.id,
            feedback_type: formData.feedback_type,
            subject: formData.subject,
            message: formData.message,
            rating: formData.rating > 0 ? formData.rating : null,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We'll review it soon.",
      });

      // Reset form
      setFormData({
        feedback_type: '',
        subject: '',
        message: '',
        rating: 0,
      });

    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
            className={`p-1 rounded transition-colors ${
              star <= formData.rating
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-muted-foreground hover:text-yellow-400'
            }`}
          >
            <Star className={`h-6 w-6 ${star <= formData.rating ? 'fill-current' : ''}`} />
          </button>
        ))}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to submit feedback and help us improve our services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Voice</h1>
          <p className="text-xl text-primary font-semibold mb-4">Our Improvement</p>
          <p className="text-muted-foreground">
            Give us your insights and help us deliver better products and services.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Submit Feedback
            </CardTitle>
            <CardDescription>
              Share your experience with ReCircuit and help us make e-waste recycling better for everyone.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="feedback_type">Feedback Category *</Label>
                <Select
                  value={formData.feedback_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, feedback_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select feedback category" />
                  </SelectTrigger>
                  <SelectContent>
                    {feedbackTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Brief description of your feedback"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Feedback *</Label>
                <Textarea
                  id="message"
                  placeholder="Please share your detailed feedback here..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Rate Your Experience (Optional)</Label>
                <div className="flex items-center space-x-2">
                  {renderStarRating()}
                  {formData.rating > 0 && (
                    <span className="text-sm text-muted-foreground ml-2">
                      {formData.rating} out of 5 stars
                    </span>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;