import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreatePage() {
  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">CARTOON CREATION PAGE</h1>

        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">GAMEPLAY UPLOAD & AI GENERATION</h2>
          <p className="text-gray-600 mb-6">
            Upload your gameplay footage, and our AI will convert it into a webtoon.
            Currently, this is a placeholder for the upcoming feature.
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
            <p className="text-gray-500 mb-4">Drag and drop your gameplay video here, or click to browse</p>
            <Button>Upload Gameplay</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">EDITING TOOLS</h2>
          <p className="text-gray-600 mb-6">
            Basic customization options for panels and captions.
            Currently, this is a placeholder for the upcoming feature.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Comic Title</label>
              <Input placeholder="Enter a title for your comic" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded-md h-24"
                placeholder="Enter a description for your comic"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="mr-2" variant="outline">Save Draft</Button>
          <Button>Publish Comic</Button>
        </div>
      </div>
    </SiteLayout>
  );
}
