<?php
abstract class PostType extends Form
{
  protected function _execute(array $data)
  {
    $postsTable = TableRegistry::get('Posts');
    $attributesTable = TableRegistry::get('PostAttributes');
    $postAttributes = [];

    $postFields = ['id', 'user_id', 'title', 'url'];
    foreach ($data as $key => $value)
    {
      if (in_array($key, $postFields)) {
        continue;
      }
      $postAttributes[] = $attributesTable->newEntity([
        'name' => $key,
        'value' => $value,
      ]);
      unset($data[$key]);
    }

    $post = $postsTable->newEntity($data);
    $post->post_attributes = $postAttributes;
    return $postsTable->save($post);
  }

  public function data(array $data)
  {

  }
}
