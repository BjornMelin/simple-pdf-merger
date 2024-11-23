import PDFMerger from '../components/ui/PDFMerger';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Simple PDF Merger
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Easily combine multiple PDF files into one document.
          Just drag and drop your files, arrange them in the desired order, and merge.
        </p>
        <PDFMerger maxFileSize={10} maxFiles={20} />
      </div>
    </main>
  );
}
