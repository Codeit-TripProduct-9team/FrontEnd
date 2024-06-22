import adminPageRequestInstance from '@/src/api/adminPageRequest';
import { TOAST_MESSAGE } from '@/src/constants/constants';
import { getCookie } from '@/src/utils/cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    videoUrl: '',
    tag: [],
    place: [{ name: '', posX: '', posY: '', description: '', img: '' }],
  });
  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState([]);

  const tagsList = ['데이트', '가족', '혼자', '산', '바다', '먹방'];

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      setFormData({
        ...formData,
        tag: formData.tag.filter((t) => t !== tag),
      });
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
      setFormData({
        ...formData,
        tag: [...formData.tag, tag],
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlaceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPlaces = formData.place.map((place, i) => (i === index ? { ...place, [name]: value } : place));
    setFormData({ ...formData, place: updatedPlaces });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminPageRequestInstance.addVideo(formData);
      if (response.status === 200) {
        toast.success(TOAST_MESSAGE.SAVE);
      }
      setFormData({
        ...formData,
        title: '',
        content: '',
        imageUrl: '',
        videoUrl: '',
        tag: [],
        place: [{ name: '', posX: '', posY: '', description: '', img: '' }],
      });
    } catch (error) {
      console.error(error);
      toast.error(TOAST_MESSAGE.FAILED_REQUEST);
    }
  };

  if (getCookie('nickname') !== 'utripadmin') {
    alert('관리자전용페이지입니다');
    router.push('/');
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Toaster />
      <h2 className="text-blue text-2xl font-bold mb-4">카드데이터</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="videoUrl">
            Video URL
          </label>
          <input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tags (최대 3개 선택)</label>
          <div className="flex flex-wrap gap-2">
            {tagsList.map((tag, idx) => (
              <div
                key={idx}
                onClick={() => handleTagClick(tag)}
                className={`rounded-md py-2 px-4 cursor-pointer bg-blue-500 text-white font-bold ${
                  selectedTags.includes(tag) ? 'bg-opacity-80' : 'bg-opacity-50'
                }`}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        {formData.place.map((place, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-2xl font-semibold mt-10 text-blue mb-2">장소데이터</h3>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor={`name-${index}`}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={place.name}
                onChange={(e) => handlePlaceChange(index, e)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor={`posX-${index}`}>
                PosX
              </label>
              <input
                type="number"
                step="any"
                name="posX"
                value={place.posX}
                onChange={(e) => handlePlaceChange(index, e)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor={`posY-${index}`}>
                PosY
              </label>
              <input
                type="number"
                step="any"
                name="posY"
                value={place.posY}
                onChange={(e) => handlePlaceChange(index, e)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor={`description-${index}`}>
                Description
              </label>
              <textarea
                name="description"
                value={place.description}
                onChange={(e) => handlePlaceChange(index, e)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor={`img-${index}`}>
                Image URL
              </label>
              <input
                type="text"
                name="img"
                value={place.img}
                onChange={(e) => handlePlaceChange(index, e)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>
        ))}

        <div
          onClick={() => router.push('/')}
          className="w-full py-2 px-4 bg-red text-center cursor-pointer mb-20 text-white font-bold rounded"
        >
          홈으로
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded">
          데이터 추가
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
