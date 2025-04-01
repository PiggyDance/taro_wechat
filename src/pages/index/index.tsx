import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function Index() {
  const [sourceImage, setSourceImage] = useState('')
  const [resultImage, setResultImage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useLoad(() => {
    console.log('Page loaded.')
  })

  const handleUpload = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setSourceImage(res.tempFilePaths[0])
        setResultImage('')
      }
    })
  }

  const handleProcess = async () => {
    if (!sourceImage) {
      Taro.showToast({ title: '请先上传图片', icon: 'none' })
      return
    }

    setIsProcessing(true)
    try {
      // TODO: 实现AI处理逻辑
      // 这里需要调用后端API进行处理
      await new Promise(resolve => setTimeout(resolve, 1500)) // 模拟处理过程
      setResultImage(sourceImage) // 暂时显示原图
    } catch (error) {
      Taro.showToast({ title: '处理失败', icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <View className='index'>
      <View className='header'>
        <Text className='title'>AI图片魔法师</Text>
        <Text className='subtitle'>上传图片，让AI为你创造惊喜</Text>
      </View>

      <View className='content'>
        <Button className='upload-btn' onClick={handleUpload}>
          {sourceImage ? '重新上传' : '上传图片'}
        </Button>

        {sourceImage && (
          <View className='image-container'>
            <Image className='preview-image' src={sourceImage} mode='aspectFit' />
            <Button 
              className='process-btn' 
              onClick={handleProcess}
              loading={isProcessing}
              disabled={isProcessing}
            >
              开始处理
            </Button>
          </View>
        )}

        {resultImage && (
          <View className='result-container'>
            <Text className='result-title'>处理结果</Text>
            <Image className='result-image' src={resultImage} mode='aspectFit' />
          </View>
        )}
      </View>
    </View>
  )
}
