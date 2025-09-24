
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormBuilderModal } from "./FormBuilderModal";
import { Edit, Eye } from "lucide-react";

export const LeadFormContent = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "Lead Retrieval Form",
    fields: [
      { id: "1", type: "text", label: "Full Name", required: true },
      { id: "2", type: "email", label: "Email", required: true },
      { id: "3", type: "text", label: "Company", required: false },
      { id: "4", type: "tel", label: "Phone Number", required: false },
      { id: "5", type: "textarea", label: "Message", required: false }
    ]
  });

  const handleFormSave = (updatedFormData: any) => {
    setFormData(updatedFormData);
    setIsBuilderOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lead Form</h1>
          <p className="text-muted-foreground">Create and customize your lead retrieval form</p>
        </div>
        <Button onClick={() => setIsBuilderOpen(true)} className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Form
        </Button>
      </div>

      {/* Form Preview - Full Width */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <Eye className="h-5 w-5" />
              Form Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.title}</h2>
                  <p className="text-gray-600">Please fill out the form below to get in touch with us</p>
                </div>
                
                {formData.fields.map((field: any) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 block">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        rows={4}
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                      />
                    ) : field.type === "select" ? (
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                        <option>Select an option</option>
                      </select>
                    ) : field.type === "checkbox" ? (
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
                      </div>
                    ) : field.type === "date" ? (
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    ) : field.type === "file" ? (
                      <div className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="text-gray-500">
                          <p className="text-sm">Click to upload or drag and drop</p>
                          <p className="text-xs mt-1">PDF, DOC, JPG up to 10MB</p>
                        </div>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium">
                    Submit Lead
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      <FormBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        formData={formData}
        onSave={handleFormSave}
      />
    </div>
  );
};
