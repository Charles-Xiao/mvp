"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Uploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [customFileName, setCustomFileName] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const uploadFileName = customFileName || fileName;
      const uploadUrl = `https://mvp-bkt.bj.bcebos.com/public/${uploadFileName}`;
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Content-Type': selectedFile.type,
        },
      });

      if (uploadResponse.ok) {
        setDownloadLink(uploadUrl);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileName('');
    setCustomFileName('');
    setDownloadLink('');
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-8 sm:mt-24">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">文件上传</h1>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <Label htmlFor="file-upload" className="block mb-1 sm:mb-2">选择文件</Label>
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="w-full text-sm sm:text-base"
          />
        </div>
        {fileName && (
          <div>
            <Label htmlFor="custom-file-name" className="block mb-1 sm:mb-2">自定义文件名（可选）</Label>
            <Input
              id="custom-file-name"
              type="text"
              value={customFileName}
              onChange={(e) => setCustomFileName(e.target.value)}
              placeholder={fileName}
              className="w-full text-sm sm:text-base"
            />
          </div>
        )}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button onClick={handleUpload} className="w-full sm:flex-1" disabled={!selectedFile}>上传文件</Button>
          <Button onClick={handleReset} variant="outline" className="w-full sm:flex-1">重置</Button>
        </div>
      </div>
      {downloadLink && (
        <div className="mt-4 sm:mt-6">
          <p className="mb-1 sm:mb-2">下载链接：</p>
          <a href={downloadLink} className="text-blue-500 hover:underline break-all text-sm sm:text-base" target="_blank" rel="noopener noreferrer">
            {downloadLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default Uploader;